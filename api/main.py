import sys, os
sys.path.append(os.path.join(os.path.dirname(__file__), "..", "target_agent"))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from simple_agent import process_input
from db import log_event, get_recent_events, update_approval

app = FastAPI(title="Agent Firewall API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class MessageRequest(BaseModel):
    text: str


class ApprovalRequest(BaseModel):
    decision: str  # "approved" or "rejected"


@app.post("/process")
def process(request: MessageRequest):
    """
    Runs a message through the full pipeline: Firewall -> Agent -> Manager.
    Logs the outcome and returns it.
    """
    result = process_input(request.text)
    event_id = log_event(request.text, result)
    result["event_id"] = event_id
    return result


@app.get("/events")
def events():
    """
    Returns recent events - powers the dashboard's live feed.
    """
    return get_recent_events()


@app.post("/events/{event_id}/approve")
def approve_event(event_id: str, request: ApprovalRequest):
    """
    Human approves or rejects a paused, high-risk action.
    """
    update_approval(event_id, request.decision)
    return {"status": "updated", "event_id": event_id, "decision": request.decision}