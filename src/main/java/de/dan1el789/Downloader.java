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
                    getExtensionDownloadCount(link.attr("abs:href"));
                    extensionList.add(new Extension(link.text(),
                            getExtensionDownloadURL(link.attr("abs:href")),
                            getExtensionDownloadCount(link.attr("abs:href")),
                            isRecommended(link.attr("abs:href")),
                            lastUpdated(link.attr("abs:href"))
                            ));
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

    private int getExtensionDownloadCount(String addOnURL){
        try {
            Document doc = Jsoup.connect(addOnURL).get();
            String downloadCountAsString = doc.
                    getElementsByClass("MetadataCard-content").get(0).ownText();
            return Integer.parseInt(downloadCountAsString.replaceAll("\\.", ""));
        } catch (Exception e){
            e.printStackTrace();
            throw new RuntimeException();
        }
    }

    private String lastUpdated(String addOnURL){
        try {
            Document doc = Jsoup.connect(addOnURL).get();
            return doc.getElementsByClass("AddonMoreInfo-last-updated")
                    .get(0).ownText();
        } catch (Exception e){
            e.printStackTrace();
            throw new RuntimeException();
        }
        //
    }

    private boolean isRecommended(String addOnURL){
        try {
            Document doc = Jsoup.connect(addOnURL).get();
            return doc.getElementsByClass("Addon-header").get(0).getElementsByClass("IconPromotedBadge-iconPath--recommended").size() > 0;
        } catch (Exception e){
            e.printStackTrace();
            throw new RuntimeException();
        }
    }

    public void saveToFile(String fileName){
        try {
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
