package backend.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ErrorResponseDto implements IDto {

    private String message;
    private String error;
    private int statusCode;

    public static ErrorResponseDto badRequest(String message) {
        return ErrorResponseDto.builder()
            .message(message)
            .error("BAD_REQUEST")
            .statusCode(400)
            .build();
    }

    public static ErrorResponseDto conflict(String message) {
        return ErrorResponseDto.builder()
            .message(message)
            .error("Conflict")
            .statusCode(409)
            .build();
    }

    public static ErrorResponseDto internalServerError() {
        return ErrorResponseDto.builder()
            .message("Internal Server Error")
            .statusCode(500)
            .build();
    }

}
