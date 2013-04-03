require "./app.rb"

class Data < Thor
  desc "fake", "load some fake data"
  def fake
    User.create(
      :name => "Dr. Keith Robinson",
      :nickname => "dkr",
      :bio => "Design, product, UX and such for Heroku. Damned if you do. Bored if you don't.",
      :city => "Dreamland",
      :email => "test@test.com"
    )

    User.create(
      :name => "Cadell Last",
      :nickname => "theratchet",
      :bio => "Evolutionary Anthropologist. Futurist.",
      :city => "Dreamland",
      :email => "test@test.com"
    )

    User.create(
      :name => "Bradley Lautenbach",
      :nickname => "lautenbach",
      :bio => "Entrepreneur at the intersection of media, technology and incredible consumer experiences. Currently: Zuckerberg Media.",
      :city => "Dreamland",
      :email => "test@test.com"
    )
  end
end
