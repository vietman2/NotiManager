# Generated by Django 4.1.2 on 2022-12-10 17:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('targetusers', '0004_alter_targetuser_notification_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='targetuser',
            name='endpoint',
            field=models.CharField(blank=True, max_length=255),
        ),
    ]