package edu.psu.jbr5410.paramount;

public class Party {
    private String name;
    private String host;
    private String email;
    private String phoneNumber;
    private String date;
    private String partyPackage;
    private String room;

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getPartyPackage() {
        return partyPackage;
    }

    public void setPartyPackage(String partyPackage) {
        this.partyPackage = partyPackage;
    }

    public String getRoom() {
        return room;
    }

    public void setRoom(String room) {
        this.room = room;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getHost() {
        return host;
    }

    public void setHost(String host) {
        this.host = host;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Party(String name, String host, String email, String phoneNumber) {
        this.name = name;
        this.host = host;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }

    public Party() {

    }
}

