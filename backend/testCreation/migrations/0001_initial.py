# Generated by Django 4.2.5 on 2023-10-09 11:27

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='React',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=250)),
                ('org_name', models.CharField(max_length=200)),
                ('test_name', models.CharField(max_length=200)),
                ('link', models.URLField()),
                ('candidates', models.IntegerField()),
                ('start_time', models.DateTimeField()),
                ('duration', models.DurationField()),
            ],
        ),
    ]
