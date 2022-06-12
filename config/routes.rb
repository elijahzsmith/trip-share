Rails.application.routes.draw do
  resources :favorites
  resources :trips
  resources :follows
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  get '/authorized_user', to: 'users#authenticate'
 
  post '/signup', to: 'users#create'

  post '/login', to: 'sessions#login'
  delete '/logout', to: 'sessions#logout'

  # Defines the root path route ("/")
  # root "articles#index"
  get '/hello', to: 'application#hello_world'

  get '*path',
    to: 'fallback#index',
    constraints: ->(req) { !req.xhr? && req.format.html? }
end
