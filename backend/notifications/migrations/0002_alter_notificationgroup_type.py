# Generated by Django 4.1.2 on 2022-11-19 09:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('notifications', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='notificationgroup',
            name='type',
            field=models.CharField(choices=[('HTTP', 'Http'), ('SLACK', 'Slack'), ('EMAIL', 'Email'), ('SMS', 'Sms')], max_length=20),
        ),
    ]
