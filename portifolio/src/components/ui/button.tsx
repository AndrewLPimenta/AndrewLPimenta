import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Botão do shadcn/ui, ajustado ao visual do site: formato de pílula,
 * alvo de toque de 44px no tamanho grande e resposta imediata ao toque.
 */
const buttonVariants = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full text-sm font-medium whitespace-nowrap outline-none transition-[background-color,color,transform] hover:no-underline active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-[3px] focus-visible:ring-ring/50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-hover hover:text-primary-foreground",
        destructive: "bg-red-600 text-white hover:bg-red-700 hover:text-white",
        outline:
          "border border-primary/70 bg-transparent text-azul hover:bg-primary/8 hover:text-azul-hover",
        secondary: "bg-secondary text-secondary-foreground hover:bg-mist-2 hover:text-secondary-foreground",
        ghost: "text-foreground hover:bg-secondary hover:text-foreground",
        link: "text-azul underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-11 px-6 text-base has-[>svg]:px-5",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";
  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
