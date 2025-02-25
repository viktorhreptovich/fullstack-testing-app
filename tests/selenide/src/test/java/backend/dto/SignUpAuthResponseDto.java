package backend.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class SignUpAuthResponseDto implements IDto {

    private String access_token;

}
