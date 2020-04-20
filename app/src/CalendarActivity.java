package edu.psu.jbr5410.paramount;

import androidx.appcompat.app.AppCompatActivity;

import android.app.DatePickerDialog;
import android.content.Intent;
import android.icu.util.Calendar;
import android.icu.util.LocaleData;
import android.os.Bundle;
import android.view.View;
import android.widget.CalendarView;
import android.widget.DatePicker;
import android.widget.TextView;

import java.time.*;
import java.time.DayOfWeek;

import java.time.LocalDate;
import java.util.Date;



public class CalendarActivity extends AppCompatActivity {


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_calendar);

        DatePicker calendar = findViewById(R.id.datePicker1);
        calendar.setMinDate(System.currentTimeMillis() - 1000);
    }

    public void Button(View view) {
        DatePicker calendar = findViewById(R.id.datePicker1);
        calendar.setMinDate(System.currentTimeMillis() - 1000);
        Intent intent = new Intent(this, PackageActivity.class);
        int day = calendar.getDayOfMonth();
        int month = calendar.getMonth() + 1; // Months in DatePicker are 0-based
        int year = calendar.getYear();

        LocalDate date = LocalDate.of(year, month, day);
        DayOfWeek dayOfWeek = DayOfWeek.from(date);

        int dow = dayOfWeek.getValue();

        if (dow == 7) { // DayOfWeek has Monday as 1, this changes 1 to Sunday
            dow = 1;
        }
        else {
            dow++;
        }

        //TextView test = findViewById(R.id.text_calendarInstructs);
        //test.setText(dow);


        intent.putExtra("day", day);
        intent.putExtra("month", month);
        intent.putExtra("year", year);

        intent.putExtra("dayOfWeek", dow);
        startActivity(intent);
    }


}
