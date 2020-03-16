package edu.psu.jbr5410.paramount;

import androidx.appcompat.app.AppCompatActivity;

import android.app.DatePickerDialog;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.Spinner;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class PackageActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_package);

        Intent intent = getIntent();

        int day = intent.getIntExtra("day", 1);
        int month = intent.getIntExtra("month", 1);
        int year = intent.getIntExtra("year", 1);

        Calendar calendar = Calendar.getInstance();
        calendar.set(year, month, day);

        EditText textDate = findViewById(R.id.text_date);
        textDate.setText(calendar.getTime().toString());
    }

    public void Submit(View view) {
        Spinner packageSpinner = findViewById(R.id.spinner_packages);
        String partyPackage = packageSpinner.getSelectedItem().toString();
        Intent intent;
        if (partyPackage.equals("Double Play"))
            intent = new Intent(this, TwoRoomActivity.class);
        else if (partyPackage.equals("Triple Play"))
            intent = new Intent(this, ThreeRoomActivity.class);
        else
            intent = new Intent(this, RoomActivity.class);

        EditText textDate = findViewById(R.id.text_date);
        String date = textDate.getText().toString();

        intent.putExtra("date", date);
        intent.putExtra("package", partyPackage);

        startActivity(intent);
    }

}
