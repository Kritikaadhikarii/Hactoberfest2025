package com.nexDew.InternalWorkingOfSpringBoot;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class InternalWorkingOfSpringBootApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(InternalWorkingOfSpringBootApplication.class, args);
	}

	public InternalWorkingOfSpringBootApplication(PaymentService paymentService) {
		this.paymentService = paymentService;
	}

	private PaymentService paymentService;

	@Override
	public void run(String... args) throws Exception {
		String payment = paymentService.payment();
		System.out.println("Payment done :"+payment);

	}
}

