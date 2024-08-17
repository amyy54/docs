# Resize Linux Partition

Archive from Pastebin. On my old Arch Linux laptop, I resized the partition 
twice, both to mess with the size of my Windows partition when I was dual 
booting at the time.

- Boot into Arch installation medium.
- Delete and remake the partition you want to replace, make sure the start 
header is where you want. (fdisk + mkfs.ext4)
- Make two folders in ``/mnt`` corresponding to the new filesystem and the old 
one, then mount the partitions.
- Delete the lost+found folder from the new filesystem, then copy EVERYTHING 
(``cp -p -r -v``) (p = permissions, r = recursive, v = verbose). Leave the old 
filesystem alone for a little.
- Delete and regenerate fstab. Remember to turn on the swap partition and mount 
the EFI partition. (``genfstab -U /mnt > /mnt/etc/fstab``)
- GRUB install not needed, just remake the config (``grub-mkconfig -o 
/boot/grub/grub.cfg``).
- GRUB config now pointing to new partition, reboot and make sure it works.
- Using fdisk, make the new filesystem the size desired (START MUST BE LEFT AS 
IS!). Delete any partitions not wanted (if swap or EFI is modified remember to 
regenerate fstab). **SAY NO TO REMOVING SIGNATURE!!!**
- After being modified, run ``e2fsck -f /dev/sdX``. Say no to anything if 
prompted.
- ``resize2fs /dev/sdX``.
- To test it, mount the filesystem and chroot to make sure it works.

