package de.dan1el789;

public class Main {
    public static void main(String[] args) {
        System.out.println("Hello world!");
        Downloader d = new Downloader(40,"https://addons.mozilla.org/de/firefox/search/?sort=users&type=extension&page=");
        d.downloadExtensions();
        d.saveToFile("extensions.csv");
    }
}