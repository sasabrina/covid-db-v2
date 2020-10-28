from .models.database import ma

class InfectedSchema(ma.Schema):
    class Meta:
        fields = ('id', 'first_name', 'last_name','age', 'infect_date', 'gender_id', 'country_id', 'status_id')


class CountrySchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'infected')