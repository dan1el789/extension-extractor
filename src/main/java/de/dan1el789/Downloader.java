package de.dan1el789;

import de.dan1el789.model.Extension;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.util.ArrayList;
import java.util.List;

public class Downloader {

    private String baseURL;
    private int amountOfPages;

    private List<Extension> extensionList;

    public Downloader(int amountOfPages, String baseURL){
        this.baseURL = baseURL;
        this.amountOfPages = amountOfPages;
        extensionList = new ArrayList<>();
    }
    public void downloadExtensions(){
        try {
            for(int pageNumber = 1; pageNumber <= amountOfPages; pageNumber++){
                Document doc = Jsoup.connect(baseURL + pageNumber).get();
                doc.getElementsByClass("SearchResult-link").forEach(link -> {
                    extensionList.add(new Extension(link.text(),
                            getExtensionDownloadURL(link.attr("abs:href"))));
                });
            }
        } catch (Exception e){
            e.printStackTrace();
            throw new RuntimeException();
        }

    }

    private String getExtensionDownloadURL(String addOnURL){
        try {
            Document doc = Jsoup.connect(addOnURL).get();
            return doc.getElementsByClass("InstallButtonWrapper-download-link")
                    .get(0).attr("href");
        } catch (Exception e){
            e.printStackTrace();
            throw new RuntimeException();
        }
    }

    public void saveToFile(String fileName){
        try {
            String str = "Hello";
            BufferedWriter writer = new BufferedWriter(new FileWriter(fileName));
            for(Extension extension : extensionList){
                writer.write(extension.toString()+"\n");
            }
            writer.close();
        } catch (Exception e){
            e.printStackTrace();
            throw new RuntimeException();
        }

    }

}
