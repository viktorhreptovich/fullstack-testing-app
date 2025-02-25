package backend.dto;

import lombok.Builder;

@Builder
public class SignUpAuthRequestDto implements IDto {

    private String username;
    private String email;
    private String password;

}
