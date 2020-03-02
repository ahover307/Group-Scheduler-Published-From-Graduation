package edu.psu.jbr5410.paramount;

import androidx.appcompat.app.AppCompatActivity;

import android.app.DatePickerDialog;
import android.content.Intent;
import android.icu.util.Calendar;
import android.os.Bundle;
import android.view.View;
import android.widget.CalendarView;
import android.widget.DatePicker;


import java.util.Date;



public class CalendarActivity extends AppCompatActivity {


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_calendar);
    }

    public void Button(View view) {

        Intent intent = new Intent(this, PackageActivity.class);
        DatePicker calendar = findViewById(R.id.datePicker1);
        int day = calendar.getDayOfMonth();
        int month = calendar.getMonth();
        int year = calendar.getYear();

        intent.putExtra("day", day);
        intent.putExtra("month", month);
        intent.putExtra("year", year);
        startActivity(intent);
    }


}
