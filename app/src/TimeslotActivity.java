package edu.psu.jbr5410.paramount;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Spinner;

import androidx.annotation.NonNull;

import com.google.android.gms.tasks.Continuation;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.functions.FirebaseFunctions;
import com.google.firebase.functions.FirebaseFunctionsException;
import com.google.firebase.functions.HttpsCallableResult;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class TimeslotActivity extends Activity {

    private int day, month, year, dayOfWeek, partyPackage;
    private String[] roomsStrings;
    private List<Integer> rooms  = new ArrayList<>();
    private List<Integer> times;

    private List<Integer> testRooms = new ArrayList<>();
    public int[] testArray = {1, 3, 4};


    private FirebaseFunctions mFunctions;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        Intent intent = getIntent();
        day = intent.getIntExtra("day", -1);
        month = intent.getIntExtra("month", -1);
        year = intent.getIntExtra("year", -1);
        dayOfWeek = intent.getIntExtra("dayOfWeek", -1);
        partyPackage = intent.getIntExtra("package", -1);
        roomsStrings = intent.getStringArrayExtra("rooms");
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_timeslot);

        rooms.add(getRoomInt(roomsStrings[0]));

        if (roomsStrings.length > 1) rooms.add(getRoomInt(roomsStrings[1]));


        if (roomsStrings.length > 2) rooms.add(getRoomInt(roomsStrings[2]));

        mFunctions = FirebaseFunctions.getInstance();

        try {

            testRooms.add(1);

            partyTimes();
        } catch (JSONException e) {
            e.printStackTrace();
        }

    }

    private void partyTimes() throws JSONException {

        getTimes(partyPackage, dayOfWeek, testArray, day, month, year)
                .addOnCompleteListener(new OnCompleteListener<List<Integer>>() {
                    @Override
                    public void onComplete(@NonNull Task<List<Integer>> task) {
                        if (!task.isSuccessful()) {
                            Exception e = task.getException();
                            if (e instanceof FirebaseFunctionsException) {
                                FirebaseFunctionsException ffe = (FirebaseFunctionsException) e;
                                FirebaseFunctionsException.Code code = ffe.getCode();
                                Object details = ffe.getDetails();
                            }

                        }
                        times = task.getResult();
                        System.out.println(times);
                        fillTimes();

                    }
                });





    }

    private void fillTimes() {
        Spinner spinner = findViewById(R.id.spinner);

        List<Integer> timesList = new ArrayList<Integer>(times.size());
        timesList.addAll(times);
        ArrayAdapter<Integer> adapter = new ArrayAdapter<Integer>(
                this, android.R.layout.simple_spinner_item, timesList
        );
        spinner.setAdapter(adapter);

    }

    private Task<List<Integer>> getTimes(int partyPackage, int dayOfWeek, int[] roomsRequested, int day,
                                 int month, int year) throws JSONException {
        // Create the arguments to the callable function.

        JSONObject data = new JSONObject();
        // Map<String, Object> data = new HashMap<>();
        data.put("partyPackage", 3);
        data.put("dayOfWeek", 7);
        data.put("roomsRequested", Arrays.toString(roomsRequested));
        data.put("dateDay", 18);
        data.put("dateMonth", 4);
        data.put("dateYear", 2020);


            return mFunctions
                    .getHttpsCallable("checkPartyTime")
                    .call(data)
                    .continueWith(new Continuation<HttpsCallableResult, List<Integer>>() {
                        @Override
                        public List<Integer> then(@NonNull Task<HttpsCallableResult> task) throws Exception {
                            // This continuation runs on either success or failure, but if the task
                            // has failed then getResult() will throw an Exception which will be
                            // propagated down.
                            List<Integer> result = (List<Integer>) task.getResult().getData();
                            // System.out.println(task.getResult().getData());
                            return result;
                        }
                    });

//        } else {
//            return mFunctions
//                    .getHttpsCallable("checkPartyTimeOne")
//                    .call(data)
//                    .continueWith(new Continuation<HttpsCallableResult, String>() {
//                        @Override
//                        public String then(@NonNull Task<HttpsCallableResult> task) throws Exception {
//                            // This continuation runs on either success or failure, but if the task
//                            // has failed then getResult() will throw an Exception which will be
//                            // propagated down.
//                            String result = (String) task.getResult().getData();
//                            System.out.println(result);
//                            return result;
//                        }
//                    });
//        }
    }

    public void Submit(View view) {
        Intent intent = new Intent(this, FinalDetailsActivity.class);

        intent.putExtra("day", day);
        intent.putExtra("month", month);
        intent.putExtra("year", year);
        intent.putExtra("dayOfWeek", dayOfWeek);
        intent.putExtra("package", partyPackage);
        intent.putExtra("rooms", (Serializable) rooms);

        startActivity(intent);
    }


    private int getRoomInt(String room) {
        switch (room) {
            case "Main Gym":
                return 1;
            case "Kid Maze":
                return 2;
            case "Rockwall":
                return 3;
            case "Preschool Room":
                return 4;
            case "Ninja Room":
                return 5;
        }
        return -1;
    }
}
