package info.mamay.video.manager.videoManager;

import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

/**
 * Настройки вебсокета.
 */
@Component
@EnableWebSocketMessageBroker
public class WebSocketConfiguration
implements WebSocketMessageBrokerConfigurer
{
    /**
     * Префикс точек вхождения.
     */
	static final String MESSAGE_PREFIX = "/topic";

    /**
     * Регистрируем точку вхождения.
     *
     * @param registry контракт на регистрацию точки вхождения.
     */
    @Override
    public void registerStompEndpoints(
        StompEndpointRegistry registry)
    {
        registry.addEndpoint("/payroll").withSockJS();
    }

    /**
     * Настраиваем брокер сообщений.
     *
     * @param registry Брокер сообщений.
     */
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry)
    {
        registry.enableSimpleBroker(MESSAGE_PREFIX);
        registry.setApplicationDestinationPrefixes("/app");
    }
}
