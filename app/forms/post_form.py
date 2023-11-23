from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, MultipleFileField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed, FileRequired
from ..api.AWS_helpers import ALLOWED_EXTENSIONS

## Add FileRequired to image FileField if posting a picture is mandatory.
## USE MultipleFileField if allowing more than 1 images

class PostForm(FlaskForm):
    image = FileField("Image File", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    categories = SelectField("Category", choices=[("For Sale"), ("Jobs"), ("Relationships"), ("Inquiries"), ("Random")])
    title = StringField("Title", validators=[DataRequired()])
    content = StringField("Content", validators=[DataRequired()])
    location = StringField("Location", validators=[DataRequired()])
