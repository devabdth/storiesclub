from flask import Flask, render_template, request, session, redirect
import random
import json

class SignUpProcessRouter:
    def __init__(self, app: Flask, config):
        self.app = app
        self.config = config

        self.assign_signup_process_router()
        self.assign_confirm_code_router()
        self.assign_change_email()
        self.assign_send_code_again()
        self.assign_save_user_data()

    def assign_save_user_data(self):
        @self.app.route('/confirmSignUp/', methods=["POST"])
        def confirm_sign_up():
            try:
                email = session.get('currentUserEmail', None)
                phone = session.get('currentUserPhoneNumber', None)
                password = session.get('currentUserPassword', None)
                
                body = dict(json.loads(request.data))
                body['email'] = email
                body['password'] = password
                body['phone'] = phone

                res = self.config.db.users.create_user(body)
                if not res is None:
                    session.pop('currentUserPassword')
                    session.pop('currentUserPhoneNumber')
                    session['currentUserId'] = str(res)
                    return self.app.response_class(status=201)
                else:
                    return self.app.response_class(status=500)
            except Exception as e:
                print(e)
                return self.app.response_class(status=500)


    def assign_change_email(self):
        @self.app.route('/changeEmail/', methods=["GET"])
        def website_change_email():
            if "currentUserEmail" in session:
                session.pop('currentUserEmail')
            return redirect('{}/signup/'.format(self.config.url))

    def assign_send_code_again(self):
        @self.app.route('/sendCodeAgain/', methods=["GET"])
        def website_send_code_again():
            try:
                code = "{}{}{}{}".format(
                    random.randint(0, 9),
                    random.randint(0, 9),
                    random.randint(0, 9),
                    random.randint(0, 9),
                )
                print(code)
                session["CurrentEmailConfirmationCode"] = code

                try:
                    import smtplib
                    from email.mime.text import MIMEText
                    recipent= session.get('currentUserEmail', None) 
                    if recipent == None:
                        return self.app.response_class(status=500)

                    msg: MIMEText= MIMEText("Welcome to StoriesClub! Your verfication code is: {}".format(code))
                    msg['Subject']= "Verify your Email"
                    msg['To']= recipent
                    msg['from']= self.config.email_model_email

                    server= smtplib.SMTP_SSL("smtp.zoho.com", 465)
                    server.login(self.config.email_model_email, self.config.email_model_access_key)

                    server.sendmail(self.config.email_model_email, [recipent], msg.as_string())
                    server.quit()
                except Exception as e:
                    print(e)
                    return self.app.response_class(status= 500)

                return self.app.response_class(status=200)

            except Exception as e:
                print(e)
                return self.app.response_class(status=500)

    def assign_confirm_code_router(self):
        @self.app.route('/completeSignUp/confrimCode/', methods=["GET"])
        def website_confirm_code():
            code = session.get('CurrentEmailConfirmationCode', None)
            code_ = dict(request.values)['code']
            if str(code) == str(code_):
                return self.app.response_class(status=200)
            else:
                return self.app.response_class(status=401)

            

            return self.app.response_class(status=500)


    def assign_signup_process_router(self):
        @self.app.route('/completeSignUp/', methods=["GET"])
        def website_signupprocess_index():
            params = dict(request.values)
            lang = session.get("lang", "ar")
            current_user_email = session.get('currentUserEmail', None)
            current_user_phoneNumber = session.get('currentUserPhoneNumber', None)
            current_user_password = session.get('currentUserPassword', None)
            current_user_id = session.get('currentUserId', None)
            if not (current_user_id is None):
                return redirect('{}/'.format(self.config.url))

            if current_user_email is None or current_user_password is None or current_user_phoneNumber is None:
                return redirect('{}/signup'.format(self.config.url))

            return render_template(
                'website/signupProcess/index.html',
                content=self.config.website_content,
                categories=self.config.categories,
                lang=lang or "en",
                current_user_email= current_user_email,
                cities= self.config.cities,
                genders= self.config.genders,
                contact_info={
                    "phone": self.config.phone,
                    "address": self.config.address,
                    "facebook": self.config.facebook,
                    "instagram": self.config.instagram,
                    "linkedin": self.config.linkedin,
                    "email": self.config.email,
                }
            )
            