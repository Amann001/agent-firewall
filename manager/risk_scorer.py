# Rule-based risk scoring for agent actions.
# Deliberately simple and rule-based (not ML-based) - honest, explainable,
# good enough for a v1, and easy to extend later.

# Domains we consider "safe" - internal/known recipients.
# Anything NOT in this list is treated as an unknown external party.
TRUSTED_DOMAINS = [
    "ourcompany.com",
    "internal.ourcompany.com",
]

HIGH_RISK_TOOLS = ["forward_data", "delete_data", "send_payment"]


def score_action(tool_name: str, arguments: dict) -> dict:
    """
    Assigns a risk level to a proposed agent action: low, medium, or high.

    Returns a dict with the risk level and the reasoning behind it -
    this reasoning is what a human reviewer sees when approving/blocking.
    """
    if tool_name not in HIGH_RISK_TOOLS:
        return {"risk": "low", "reason": f"'{tool_name}' is not a sensitive action."}

    recipient = arguments.get("recipient", "")
    domain = recipient.split("@")[-1].lower() if "@" in recipient else ""

    if domain in TRUSTED_DOMAINS:
        return {"risk": "medium", "reason": f"Sensitive action, but recipient domain '{domain}' is trusted."}

    return {
        "risk": "high",
        "reason": f"Sensitive action '{tool_name}' targeting an UNTRUSTED external recipient: {recipient}",
    }


# Standalone test
if __name__ == "__main__":
    test_cases = [
        ("forward_data", {"recipient": "external-auditor@quickmail-partners.com", "data": "financial data"}),
        ("forward_data", {"recipient": "reports@ourcompany.com", "data": "financial data"}),
        ("summarize_text", {}),
    ]

    for tool_name, args in test_cases:
        result = score_action(tool_name, args)
        print(f"{tool_name} -> {result['risk'].upper()}: {result['reason']}")