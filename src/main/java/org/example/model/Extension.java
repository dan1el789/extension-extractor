package org.example.model;

public class Extension {

    private static int idCounter = 1;

    public Extension(String name, String downloadURL){
        this.id = idCounter++;
        this.name = name;
        this.downloadURL = downloadURL;
        System.out.println(this);
    }

    public int getId() {
        return id;
    }

    private int id;

    public String getName() {
        return name;
    }

    private String name;
    private String downloadURL;

    public String getDownloadURL() {
        return downloadURL;
    }

    @Override
    public String toString() {
        return id + "," + name.replaceAll(",", "")
                + "," + downloadURL.replaceAll(",", "");
    }
}
