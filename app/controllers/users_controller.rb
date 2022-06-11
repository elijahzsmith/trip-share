class UsersController < ApplicationController
     # Authorization
    before_action :authorize_user, except: [:create, :index]

    def index
        render json: User.all, status: :ok
    end

    def show
        current_user = User.find_by!(id: session[:current_user]) 
        render json: current_user, status: :ok
    end

    def create 
        user = User.create!(user_params)
        session[:current_user] = user.id
        render json: user, status: :created
    end

    def update
        user = find_user
        user.update!(user_params)
        render json: user, status: :ok
    end

    def destroy
        user = find_user
        user.destroy
        head :no_content
    end

    private

    def find_user
        User.find(params[:id])
    end

    def user_params
        params.permit(:id, :name, :password)
    end
end
