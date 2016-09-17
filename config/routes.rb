Rails.application.routes.draw do
  root 'static_pages#home'

  get 'help'     => 'static_pages#help'

  get 'about'    => 'static_pages#about'
  
  get 'callback' => 'static_pages#callback'
  
  get 'songs'    => 'static_pages#songs'
  
  get 'play'  => 'static_pages#play' 
end