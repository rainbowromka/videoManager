package info.mamay.video.manager.videoManager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.boot.autoconfigure.flyway.FlywayMigrationStrategy;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;

@SpringBootApplication
@EnableTransactionManagement
public class VideoManagerApplication {

	/**
	 * Можно ли создавать базу с нуля при запуске приложения.
	 */
	Boolean isCleanDb = true;

	public static void main(String[] args) {
		SpringApplication.run(VideoManagerApplication.class, args);
	}

	/**
	 * Бин которые выполняет миграцию базы данных, зависит от поля isCleanDB.
	 * @return
	 */
	@Bean
	@Profile("!production")
	public FlywayMigrationStrategy cleanMigrationStrategy ()
	{
		FlywayMigrationStrategy strategy = flyway -> {
			if (isCleanDb) {
				flyway.clean();
				flyway.migrate();
			}
		};
		return strategy;
	}
}
