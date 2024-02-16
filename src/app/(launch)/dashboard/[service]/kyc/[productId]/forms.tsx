"use client";

import { Button, Tabs } from "@/components/flowbite";
import DynamicForm from "@/components/form/dynamicForm";

export const Forms = () => {
	return (
		<Tabs aria-label="Form tabs" style="underline">
			<Tabs.Item active title="Address">
				<DynamicForm
					formInfo={[
						{
							name: "address",
							type: "text",
							label: "Enter your business address",
						},
					]}
				>
					<Button color="primary">Submit</Button>
				</DynamicForm>
			</Tabs.Item>
			<Tabs.Item title="Director">
				<DynamicForm
					formInfo={[
						{
							name: "name",
							type: "text",
							label: "Enter your name",
						},
					]}
				>
					<Button color="primary">Submit</Button>
				</DynamicForm>
			</Tabs.Item>
			<Tabs.Item title="Shareholder">
				<DynamicForm
					formInfo={[
						{
							name: "name",
							type: "text",
							label: "Enter your name",
						},
					]}
				>
					<Button color="primary">Submit</Button>
				</DynamicForm>
			</Tabs.Item>
			<Tabs.Item title="Benefactor">
				<DynamicForm
					formInfo={[
						{
							name: "name",
							type: "text",
							label: "Enter your name",
						},
					]}
				>
					<Button color="primary">Submit</Button>
				</DynamicForm>
			</Tabs.Item>
		</Tabs>
	);
};
