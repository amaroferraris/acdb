# Generated by Django 4.2.3 on 2024-05-15 03:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('acdj', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='caraccessory',
            name='description',
        ),
        migrations.RemoveField(
            model_name='carmodel',
            name='year',
        ),
    ]
