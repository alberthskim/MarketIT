from flask_wtf import FlaskForm
from wtforms import StringField, SelectField
from wtforms.validators import DataRequired


class PostForm(FlaskForm):
    images = StringField("Insert Picture", validators=[DataRequired()])
    categories = SelectField("Category Type", choices=[("")])
    title = StringField("Title", validators=[DataRequired()])
    content = StringField("Content", validators=[DataRequired()])
