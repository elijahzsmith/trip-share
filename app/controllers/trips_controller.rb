class TripsController < ApplicationController
    before_action :authorize_user, only: [:create, :update, :destroy]

    def index
        render json: Trip.all, status: :ok
    end
 
    def show
        trip = find_trip
        render json: trip, status: :ok
    end

    def create
        trip = Trip.create!(trip_params)
        render json: trip, status: :created
    end

    def update
        trip = find_trip
        trip.update!(trip_params)
        render json: trip, status: :ok
    end

    def destroy
        trip = find_trip
        trip.destroy
        head :no_content
    end

    private

    def find_trip
        Trip.find(params[:id])
    end

    def trip_params
        params.permit(:id, :user_id, :location, :description, :photo_url)
    end
end
