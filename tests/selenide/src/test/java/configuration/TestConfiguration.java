package configuration;

import com.codeborne.selenide.Configuration;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.yaml.snakeyaml.LoaderOptions;
import org.yaml.snakeyaml.Yaml;
import org.yaml.snakeyaml.constructor.Constructor;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.nio.file.Path;
import java.nio.file.Paths;


@Getter
@Setter
@Slf4j
public final class TestConfiguration {

    private static final TestConfiguration instance;

    static {
        Path configPath = Paths.get("./testconfig.yaml");
        Constructor constructor = new Constructor(TestConfiguration.class, new LoaderOptions());
        Yaml yaml = new Yaml(constructor);
        try {
            instance = yaml.load(new FileInputStream(configPath.toFile()));
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        }

        Configuration.baseUrl = instance.url;
    }

    private String url;
    private SelenideConfiguration selenide;

    private TestConfiguration() {
    }

    public static String getUrl() {
        return instance.url;
    }


}
