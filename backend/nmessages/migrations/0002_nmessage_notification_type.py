# Generated by Django 4.1.2 on 2022-11-19 09:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('nmessages', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='nmessage',
            name='notification_type',
            field=models.CharField(choices=[('HTTP', 'Http'), ('SLACK', 'Slack'), ('EMAIL', 'Email'), ('SMS', 'Sms')], default=1, max_length=32),
            preserve_default=False,
        ),
    ]
