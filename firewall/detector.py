from rules import rule_based_check
from llm_judge import llm_based_check


def check_input(text: str) -> dict:
    """
    The main firewall entry point. Runs Layer 1 (fast, free) first.
    Only calls Layer 2 (AI judge) if Layer 1 doesn't already catch something -
    this saves API calls and quota on obvious attacks.

    Returns a dict describing the verdict and which layer caught it (if any).
    """
    # Layer 1: fast, free keyword check
    layer1_result = rule_based_check(text)

    if layer1_result["flagged"]:
        return {
            "blocked": True,
            "caught_by": "layer_1_rules",
            "reason": f"Matched known suspicious pattern(s): {layer1_result['matches']}",
        }

    # Layer 2: only runs if Layer 1 found nothing - smarter, but costs an API call
    layer2_result = llm_based_check(text)

    if layer2_result["flagged"]:
        return {
            "blocked": True,
            "caught_by": "layer_2_llm_judge",
            "reason": layer2_result["reasoning"],
        }

    return {
        "blocked": False,
        "caught_by": None,
        "reason": "No manipulation detected.",
    }


# Standalone test
if __name__ == "__main__":
    import json

    with open("../attack_corpus/test_attacks.json", "r") as f:
        corpus = json.load(f)

    print("--- Full firewall test: MALICIOUS examples ---\n")
    for attack in corpus["malicious"]:
        result = check_input(attack["text"])
        status = "BLOCKED" if result["blocked"] else "ALLOWED (missed!)"
        print(f"[{status}] {attack['id']} - caught by: {result['caught_by']}")

    print("\n--- Full firewall test: BENIGN examples ---\n")
    for benign in corpus["benign"]:
        result = check_input(benign["text"])
        status = "ALLOWED (correct)" if not result["blocked"] else "BLOCKED (false positive!)"
        print(f"[{status}] {benign['id']}")