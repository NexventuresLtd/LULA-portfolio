import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from app.core.config import settings
import logging

logger = logging.getLogger(__name__)


def send_enquiry_notification(name: str, email: str, phone: str, subject: str, message: str):
    """Send email notification to org when a new enquiry is submitted."""
    if not settings.SMTP_HOST or not settings.NOTIFY_EMAIL:
        logger.warning("SMTP not configured, skipping email notification")
        return

    try:
        msg = MIMEMultipart()
        msg["From"] = settings.SMTP_FROM_EMAIL or settings.SMTP_USER
        msg["To"] = settings.NOTIFY_EMAIL
        msg["Subject"] = f"New Contact Enquiry: {subject}"

        body = f"""
New contact form submission received:

Name: {name}
Email: {email}
Phone: {phone or 'Not provided'}
Subject: {subject}

Message:
{message}

---
This is an automated notification from your LULA website contact form.
"""
        msg.attach(MIMEText(body, "plain"))

        with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT) as server:
            server.starttls()
            server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
            server.send_message(msg)

        logger.info(f"Enquiry notification sent to {settings.NOTIFY_EMAIL}")
    except Exception as e:
        logger.error(f"Failed to send enquiry notification: {e}")
