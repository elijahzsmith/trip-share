class SessionsController < ApplicationController
    # Authorization
    before_action :authorize_user, except: [:login]

    def login
        user = User.find_by(username: params[:username])

        if user&.authenticate(params[:password])
            session[:current_user] = user.id
            # Set sessions login attempts
            session[:login_attempts] = 0
            # end
            render json: user, status: :created
        else
            # Setting sessions login attemps 
            session[:login_attempts] ||= 0
            session[:login_attempts] += 1
            # end
            render json: { error: "Invalid Username or Password" }, status: :unauthorized
        end
    end

    def logout
        session.delete :current_user
        head :no_content
    end
end
