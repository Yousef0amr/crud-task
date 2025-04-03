

import {
    Dialog,
    DialogContent,
    DialogHeader,
} from "@/components/ui/dialog";

export function ModelDialog({
    children,
    open,
    handleClose
}: {
    children: React.ReactNode;
    open: boolean;
    handleClose: () => void;
}) {

    return (

        <Dialog open={open} onOpenChange={handleClose} >
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader></DialogHeader>
                {children}
            </DialogContent>
        </Dialog>

    );
}
