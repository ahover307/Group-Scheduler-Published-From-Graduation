package edu.psu.jbr5410.paramount;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.Spinner;

import java.util.Date;

public class PackageActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_package);

        Intent intent = getIntent();
        Long date = intent.getLongExtra("date", -1);
        Date d = new Date();
        d.setTime(date);

        EditText textDate = findViewById(R.id.text_date);
        textDate.setText(d.toString());
    }

    public void Submit(View view) {
        Intent intent = new Intent(this, RoomActivity.class);

        EditText textDate = findViewById(R.id.text_date);
        String date = textDate.getText().toString();

        Spinner packageSpinner = findViewById(R.id.spinner_packages);
        String partyPackage = packageSpinner.getSelectedItem().toString();

        intent.putExtra("date", date);
        intent.putExtra("package", partyPackage);

        startActivity(intent);
    }
}
