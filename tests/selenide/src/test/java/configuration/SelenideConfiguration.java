package configuration;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SelenideConfiguration {

    private long timeout;
    private long pollingInterval;
    private boolean headless;

}
