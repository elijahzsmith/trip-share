class ApplicationController < ActionController::API
    include ActionController::Cookies

    # wrap_parameters false
    
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found_response
    rescue_from ActiveRecord::RecordInvalid, with: :record_invalid_response

    def hello_world
        session[:count] = (session[:count] || 0) + 1
        render json: { count: session[:count] }
    end

    private

    # def authorize_user
    #     @current_user =  User.find_by(id: session[:current_user])

    #     return render json: { error: "Not Authorized" }, status: :unauthorized unless @current_user
    # end

    def record_not_found_response(not_found)
        render json: { error: "#{not_found.model} not found" }, status: :not_found
    end
 
    def record_invalid_response(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

end
