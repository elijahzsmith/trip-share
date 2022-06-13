class CommentsController < ApplicationController
    before_action :authorize_user, only: [:create, :update, :destroy]

    def index
        render json: Comment.all, status: :ok
    end
 
    def show
        comment = find_comment
        render json: comment, status: :ok
    end

    def create
        comment = Comment.create!(comment_params)
        render json: comment, status: :created
    end

    def update
        comment = find_comment
        comment.update!(comment_params)
        render json: comment, status: :ok
    end

    def destroy
        comment = find_comment
        comment.destroy
        head :no_content
    end

    private

    def find_comment
        Comment.find(params[:id])
    end

    def comment_params
        params.permit(:id, :content, :user_id, :trip_id)
    end
end
