from typing import Tuple

def check_chars(password):

    flag_digit = any(char.isdigit() for char in password)
    flag_letter = any(char.isalpha() for char in password)

    if flag_digit and flag_letter:
        return True

    return False

def validate_password(password) -> Tuple[str, bool]:

    status = True
    message = "Şifrə dəyişdirildi"

    if len(password) < 6:
        message = "Şifrə ən az 6 işarədən ibarət olmalıdır"
        status = False

    elif not check_chars(password):
        message = "Şifrə ən az bir rəqəm və hərfdən ibarət olmalıdır"
        status = False

    return message, status