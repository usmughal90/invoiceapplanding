function nameInitials(name: string): string {
 return name
   .split(" ")
   .map((p) => p.trim().slice(0, 1))
   .join("")
   .slice(0, 2)
   .toUpperCase();
}

export default nameInitials;