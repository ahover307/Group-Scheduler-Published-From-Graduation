package edu.psu.jbr5410.paramount;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;

import java.io.Serializable;
import java.util.ArrayList;


public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar myToolbar = findViewById(R.id.toolbar);
        setSupportActionBar(myToolbar);

    }

    public void testCheckout(View view) {
        Intent intent = new Intent(this, CheckoutActivity.class);

        ArrayList<Integer> rooms = new ArrayList<>();
        rooms.add(0);

        intent.putExtra("day", 13);
        intent.putExtra("month", 4);
        intent.putExtra("year", 2020);
        intent.putExtra("dayOfWeek", 2);
        intent.putExtra("package", 1);
        intent.putExtra("rooms", (Serializable) rooms);
        intent.putExtra("contact", "Ryan Nguyen");
        intent.putExtra("partyName", "JJ");
        intent.putExtra("email", "nguyenryan31@gmail.com");
        intent.putExtra("phone", "717-424-2424");

        startActivity(intent);
    }

    public void partiesButton(View view) {
        Intent intent = new Intent(this, CalendarActivity.class);
        startActivity(intent);
    }

    public void ninjaButton(View view) {
        Intent intent = new Intent(this, NinjaActivity.class);
        startActivity(intent);
    }

    public void gymnasticsButton(View view) {
        Intent intent = new Intent(this, GymnasticsActivity.class);
        startActivity(intent);
    }

    public void fitnessButton(View view) {
        Intent intent = new Intent(this, FitnessActivity.class);
        startActivity(intent);
    }

    public void preschoolButton(View view) {
        Intent intent = new Intent(this, PreschoolActivity.class);
        startActivity(intent);
    }
}
