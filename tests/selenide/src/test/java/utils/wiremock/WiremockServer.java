package utils.wiremock;

import com.github.tomakehurst.wiremock.WireMockServer;
import com.github.tomakehurst.wiremock.client.MappingBuilder;

import static com.github.tomakehurst.wiremock.core.WireMockConfiguration.options;

public class WiremockServer {

    private static WiremockServer instance;

    private final WireMockServer wireMockServer;

    private WiremockServer() {
        this.wireMockServer = new WireMockServer(options().port(3001).stubCorsEnabled(true));
    }

    private static WiremockServer getInstance() {
        if (instance == null) {
            synchronized (WiremockServer.class) {
                if (instance == null) {
                    instance = new WiremockServer();
                }
            }
        }
        return instance;
    }

    public static WiremockServer wiremockServer() {
        return getInstance();
    }

    public void start() {
        this.wireMockServer.start();
    }

    public void stop() {
        this.wireMockServer.stop();
    }

    public void stubFor(MappingBuilder mappingBuilder) {
        this.wireMockServer.stubFor(mappingBuilder);
    }

}
