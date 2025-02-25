package backend.services;

import backend.dto.ErrorResponseDto;
import backend.dto.IDto;
import com.github.tomakehurst.wiremock.client.MappingBuilder;
import com.github.tomakehurst.wiremock.client.ResponseDefinitionBuilder;
import com.github.tomakehurst.wiremock.client.WireMock;
import lombok.Getter;
import lombok.Setter;
import wiremock.com.fasterxml.jackson.annotation.JsonInclude;
import wiremock.com.fasterxml.jackson.databind.JsonNode;
import wiremock.com.fasterxml.jackson.databind.ObjectMapper;

import static com.github.tomakehurst.wiremock.client.WireMock.aResponse;
import static com.github.tomakehurst.wiremock.client.WireMock.equalTo;
import static utils.wiremock.WiremockServer.wiremockServer;

@Getter
@Setter
public abstract class ServiceMock<T> {

    private static final ObjectMapper objectMapper = new ObjectMapper().setSerializationInclusion(JsonInclude.Include.NON_NULL);
    private MappingBuilder mock;
    private ResponseDefinitionBuilder response = aResponse();

    private int statusCode = 200;
    private JsonNode jsonBody;

    public T testId(String testId) {
        mock.withHeader("Test-Id", equalTo(testId));
        return (T) this;
    }

    public T withStatus(int statusCode) {
        response.withStatus(statusCode);
        return (T) this;
    }

    public T withJsonBody(IDto dto) {
        response.withJsonBody(objectMapper.valueToTree(dto));
        return (T) this;
    }

    public void mock() {
        wiremockServer().stubFor(
            this.mock.willReturn(this.response)
        );
    }


    protected T post(String url) {
        this.mock = WireMock.post(url);
        return (T) this;
    }

    public T withError(ErrorResponseDto error) {
        this.withStatus(error.getStatusCode());
        this.withJsonBody(error);
        return (T) this;
    }

}
