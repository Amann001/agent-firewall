import os
from dotenv import load_dotenv
from supabase import create_client

env_path = os.path.join(os.path.dirname(__file__), ".env.local")
load_dotenv(env_path)

supabase = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_KEY"))


def log_event(input_text: str, result: dict) -> str:
    outcome = result.get("type", "unknown")

    if result.get("manager_status") == "paused_for_approval":
        outcome = "paused_for_approval"

    event_data = {
        "input_text": input_text,
        "outcome": outcome,
        "caught_by": result.get("caught_by"),
        "tool_name": result.get("tool_name"),
        "arguments": result.get("arguments"),
        "risk_level": result.get("manager_risk"),
        "reason": result.get("reason") or result.get("manager_reason"),
        "approval_status": result.get("manager_status", "n/a"),
    }

    response = supabase.table("events").insert(event_data).execute()
    return response.data[0]["id"]


def get_recent_events(limit: int = 20):
    result = supabase.table("events").select("*").order("created_at", desc=True).limit(limit).execute()
    return result.data


def update_approval(event_id: str, decision: str):
    supabase.table("events").update({"approval_status": decision}).eq("id", event_id).execute()