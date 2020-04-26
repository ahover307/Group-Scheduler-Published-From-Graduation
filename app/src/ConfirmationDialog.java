package edu.psu.jbr5410.paramount;

import android.app.AlertDialog;
import android.app.Dialog;
import android.content.Context;
import android.content.DialogInterface;
import android.os.Bundle;

import androidx.fragment.app.DialogFragment;

public class ConfirmationDialog extends DialogFragment {

    public interface DialogListener {
        void onDialogPositiveClick(DialogFragment dialog);
    }

    DialogListener listener;

    @Override
    public Dialog onCreateDialog(Bundle savedInstanceState) {
        AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());

        String title = "";
        String content = "";
        String confirmButton = "";



        String checkout = getArguments().getString("checkout");
        String timeslots = getArguments().getString("timeslots");


        if (timeslots.equals("null")) {
            title = "Confirmation";
            content = checkout;
            confirmButton = "Done";

        } else if (checkout.equals("null")) {
            title = "Party Times";
            content = timeslots;
            confirmButton = "Okay";

        }








        builder.setTitle(title)
                .setMessage(content)
                .setPositiveButton(confirmButton, new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int id) {
                        listener.onDialogPositiveClick(ConfirmationDialog.this);
                    }
                });


        return builder.create();
    }

    public void onAttach(Context context) {
        super.onAttach(context);
        try {
            listener = (DialogListener) context;
        }
        catch (ClassCastException e) {
            throw new ClassCastException("Activity must implement PunchDialogListener");
        }
    }
}
