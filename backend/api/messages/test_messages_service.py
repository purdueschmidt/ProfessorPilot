from .messages_service import get_admin_message, get_protected_message, get_public_message


def test_get_public_message():
    message = get_public_message()
    assert message.text == "This is a public message."
