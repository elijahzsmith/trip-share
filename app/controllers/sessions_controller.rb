class SessionsController < ApplicationController
    # Authorization
    before_action :authorize_user, except: [:login]

    def login
        user = User.find_by(name: params[:username])

        if user&.authenticate(params[:password])
            session[:current_user] = user.id
            render json: user, status: :created
        else
            render json: { error: "Invalid Username or Password" }, status: :unauthorized
        end
    end

    def logout
        session.delete :current_user
        head :no_content
    end
end
