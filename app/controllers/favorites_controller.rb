class FavoritesController < ApplicationController
    # before_action :authorize_user, except: [:create]

    def index
        render json: Favorite.all, include: :users, status: :ok
    end
 
    def show
        favorite = find_favorite
        render json: current_favorite, status: :ok
    end

    def create
        favorite = Favorite.create!(favorite_params)
        render json: favorite, status: :created
    end

    def update
        favorite = find_favorite
        favorite.update!(favorite_params)
        render json: favorite, status: :ok
    end

    def destroy
        favorite = find_favorite
        favorite.destroy
        head :no_content
    end

    private

    def find_favorite
        Favorite.find(params[:id])
    end

    def favorite_params
        params.permit(:id, :user_id, :trip_id)
    end
end
