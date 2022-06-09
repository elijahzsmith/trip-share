class FollowsController < ApplicationController
     # Authorization
    #  before_action :authorize_follow, except: [:create]

     def index
        render json: Follow.all, status: :ok
    end
 
    def show
        follow = find_follow
        render json: current_follow, status: :ok
    end

    def create
        follow = Follow.create!(follow_params)
        render json: follow, status: :created
    end

    def update
        follow = find_follow
        follow.update!(follow_params)
        render json: follow, status: :ok
    end

    def destroy
        follow = find_follow
        follow.destroy
        head :no_content
    end

    private

    def find_follow
        Follow.find(params[:id])
    end

    def follow_params
        params.permit(:id, :follower_id, :followee_id)
    end
end
