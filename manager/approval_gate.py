from risk_scorer import score_action


def evaluate_action(tool_name: str, arguments: dict) -> dict:
    """
    Decides what happens to a proposed agent action based on its risk level.

    - low: executes immediately, no friction
    - medium: executes, but logged for review
    - high: PAUSED - requires explicit human approval before proceeding
    """
    risk_result = score_action(tool_name, arguments)
    risk = risk_result["risk"]

    if risk == "high":
        return {
            "status": "paused_for_approval",
            "risk": risk,
            "reason": risk_result["reason"],
            "action": {"tool_name": tool_name, "arguments": arguments},
        }

    return {
        "status": "executed",
        "risk": risk,
        "reason": risk_result["reason"],
        "action": {"tool_name": tool_name, "arguments": arguments},
    }


# Standalone test
if __name__ == "__main__":
    test_cases = [
        ("forward_data", {"recipient": "external-auditor@quickmail-partners.com", "data": "financial data"}),
        ("forward_data", {"recipient": "reports@ourcompany.com", "data": "financial data"}),
        ("summarize_text", {}),
    ]

    for tool_name, args in test_cases:
        result = evaluate_action(tool_name, args)
        print(f"\n[{result['status'].upper()}] {tool_name}")
        print(f"  Risk: {result['risk']}")
        print(f"  Reason: {result['reason']}")